
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { nutritionText, healthPreferences } = await req.json()

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set')
    }

    // Construct the prompt for nutrition analysis
    const prompt = `
      Analyze this nutrition label information:
      ${nutritionText}

      Health Context:
      - Nutritional Goals: ${healthPreferences.nutritionalGoals || 'Not specified'}
      - Dietary Restrictions: ${healthPreferences.dietaryRestrictions || 'None'}
      - Health Conditions: ${healthPreferences.healthConditions || 'None'}
      - Wellness Goals: ${healthPreferences.wellnessGoals || 'Not specified'}

      Provide a comprehensive analysis including:
      1. Overall health rating (1-5)
      2. Main feedback about the food item
      3. Positive highlights (list)
      4. Health considerations or concerns (list)
    `

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    })

    const data = await response.json()
    console.log('Gemini API response:', data)

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response from Gemini API')
    }

    const aiResponse = data.candidates[0].content.parts[0].text

    // Parse the AI response to extract structured information
    const lines = aiResponse.split('\n')
    let rating = 3 // default rating
    let feedback = ''
    const positiveHighlights = []
    const healthConcerns = []

    // Basic parsing of the AI response
    for (const line of lines) {
      if (line.toLowerCase().includes('rating') && !isNaN(parseFloat(line))) {
        rating = parseFloat(line.match(/\d+(\.\d+)?/)[0])
      } else if (line.includes('•') || line.includes('*')) {
        if (line.toLowerCase().includes('positive') || line.toLowerCase().includes('highlight')) {
          positiveHighlights.push(line.replace(/^[•*]\s*/, ''))
        } else if (line.toLowerCase().includes('concern') || line.toLowerCase().includes('warning')) {
          healthConcerns.push(line.replace(/^[•*]\s*/, ''))
        }
      } else if (line.length > 30 && !line.toLowerCase().includes('rating')) {
        feedback = line.trim()
      }
    }

    const analysisResult = {
      rating: Math.min(Math.max(rating, 1), 5), // Ensure rating is between 1-5
      feedback: feedback || 'Analysis completed successfully.',
      positiveHighlights: positiveHighlights.length > 0 ? positiveHighlights : ['Contains essential nutrients'],
      healthConcerns: healthConcerns.length > 0 ? healthConcerns : ['No major concerns identified']
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error in analyze-nutrition function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

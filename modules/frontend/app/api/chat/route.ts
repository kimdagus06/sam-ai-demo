import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages || [];

    // Fallback for API key if env var is missing
    const apiKey = process.env.OPENROUTER_API_KEY || 'YOUR_OPENROUTER_KEY_HERE';

    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: apiKey,
      defaultHeaders: {
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Samhall AI Assistant',
      },
    });

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-exp:free', 
      messages: [
        {
          role: 'system',
          content: `You are SAM AI.
**FORMATTING RULE:** Always wrap key details (Dates, Times, Locations, Action Items) in double asterisks like this: **Today**, **10 mins**, **Level 2**.

**CLOSURE RULE:**
As soon as the user confirms the details (e.g., says "Yes" to sick leave, or gives an arrival time for late):
1. Summarize the plan using bold text for key info (e.g., "I've noted you are off **Today**").
2. **YOU MUST APPEND THIS EXACT TAG AT THE END:**
   ||SUGGEST: I am done (Send now), I have more questions||

*Do not ask generic questions like "Is there anything else?" without this tag.*

**Scenario - Sick Leave:**
User: 'Yes, please.'
AI: 'Understood. I will report that you are off **Today**. Are you done? ||DATE:Today|| ||SUGGEST: I am done (Send now), I have more questions||'

**Scenario - Late:**
User: 'I'll be there in 30 mins.'
AI: 'Okay. I will report you are arriving in **30 mins**. Ready to send? ||DATE:Today|| ||SUGGEST: I am done (Send now), I have more questions||'`
        },
        ...messages,
      ],
    });

    const reply = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    return NextResponse.json({ role: 'assistant', content: reply });

  } catch (error) {
    console.error('Error in chat route:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

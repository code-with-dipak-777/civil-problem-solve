import OpenAI from 'openai';
import { env } from '../config/env';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const detectDuplicateIssue = async (newIssue: any, candidateIssues: any[]) => {
  if (candidateIssues.length === 0) return { isDuplicate: false };

  try {
    const candidateContext = candidateIssues
      .map((issue, index) => {
        return `Candidate ${index + 1}:\nID: ${issue._id}\nTitle: ${issue.title}\nDescription: ${issue.description}\nLocation: ${issue.location}\nDistrict: ${issue.district}\nCategory: ${issue.category}`;
      })
      .join('\n\n');

    const prompt = `
You are an AI assistant for a civic issue reporting system. Your task is to determine if a newly reported issue is a duplicate of any existing pending or in-progress issues nearby.

New Issue:
Title: ${newIssue.title}
Description: ${newIssue.description}
Location: ${newIssue.location}
District: ${newIssue.district}
Category: ${newIssue.category}

Existing Candidates:
${candidateContext}

Analyze the details. If the new issue describes the exact same problem at the exact same location as one of the candidates, it is a duplicate.
Return a structured JSON response exactly matching this format:
{
  "isDuplicate": true or false,
  "confidence": a number between 0 and 1,
  "reason": "short explanation",
  "duplicateOfId": "ID of the candidate if it is a duplicate, or null"
}
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');

    if (result.isDuplicate && result.confidence >= env.AI_DUPLICATE_THRESHOLD && result.duplicateOfId) {
      return result;
    }
    return { isDuplicate: false };
  } catch (error) {
    console.error('AI duplicate detection failed:', error);
    // Return false on failure to ensure non-blocking issue creation
    return { isDuplicate: false };
  }
};

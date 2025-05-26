import OpenAI from 'openai';
import users from '../models/user.model';
import {Request, Response} from 'express';
import { config } from 'dotenv';
config();
const apiKey = process.env.OPENAI_API as string;

const client = new OpenAI({apiKey});

export const getAiResponse = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const user = await users.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({message: 'User not registered OR Token malfunctioned'});

    const userInput = req.body.question;
    const language = req.body.language;
    if (!userInput) {
      return res
        .status(400)
        .send({error: 'Question is required in the request body.'});
    }

    user.chats.push({role: 'user', content: userInput});
    // user.chats.push({role: 'assistant', content: response.output_text});
    const response = await client.responses.create({
      model: 'gpt-4.1',
      input: userInput,
    });
    user.chats.push({role: 'assistant', content: response.output_text});
    await user.save();
    res.send(response.output_text);
  } catch (error: any) {
    console.error(error);
    res.status(500).send({error: 'Something went wrong!'});
  }
};

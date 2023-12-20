import { OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';
dotenv.config();

const authClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage'
);

export default async function extractGoogleUserInfoPayloadAndTokens(req) {
    if(!req.body.code) return null;

    const { tokens } = await authClient.getToken(req.body.code);

    const ticket = await authClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    return {
      tokens: tokens,
      payload: ticket.getPayload()
    };
}

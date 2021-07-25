const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const googleVerify = async( idToken ) => {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.CLIENT_ID
    });
    // console.log(ticket.getPayload())
    const { name, picture, email } = ticket.getPayload();
    return { name, picture, email };
}

module.exports = { googleVerify };
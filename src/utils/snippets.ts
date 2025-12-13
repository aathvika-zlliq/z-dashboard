export type LangKey = "curl" | "node";

export const smtpSnippets = (
  host: string,
  port: number,
  user: string,
  token: string
) => ({
  curl: `
curl --url smtp://${host}:${port} \\
  --user '${user}:${token}' \\
  --mail-from info@zlliq.com \\
  --mail-rcpt user@example.com \\
  --upload-file mail.txt
`,

  node: `
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "${host}",
  port: ${port},
  secure: false,
  auth: {
    user: "${user}",
    pass: "${token}"
  }
});

await transporter.sendMail({
  from: "info@zlliq.com",
  to: "user@example.com",
  subject: "SMTP Test",
  text: "Hello via SMTP"
});
`,
});

export const apiSnippets = (token: string) => ({
  curl: `
curl --request POST \\
  --url https://api.zeptomail.in/v1.1/email \\
  --header 'Authorization: Zoho-enczapikey ${token}' \\
  --header 'Content-Type: application/json' \\
  --data '{
    "from": { "address": "info@zlliq.com" },
    "to": [{
      "email_address": { "address": "user@example.com" }
    }],
    "subject": "API Test",
    "htmlbody": "<p>Hello API</p>"
  }'
`,

  node: `
import fetch from "node-fetch";

await fetch("https://api.zeptomail.in/v1.1/email", {
  method: "POST",
  headers: {
    "Authorization": "Zoho-enczapikey ${token}",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    from: { address: "info@zlliq.com" },
    to: [{ email_address: { address: "user@example.com" } }],
    subject: "API Test",
    htmlbody: "<p>Hello API</p>"
  })
});
`,
});

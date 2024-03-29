import { createTransport } from "nodemailer";
import { SendVerificationRequestParams } from "next-auth/providers/email";

export async function sendVerificationRequest({
  identifier,
  url,
  provider,
}: SendVerificationRequestParams) {
  const { host } = new URL(url);

  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `${host}へのログイン | Smart名刺`,
    text: text({ url, host }),
    html: html({ url, host }),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

type MessageParams = {
  url: string;
  host: string;
};

function html({ url, host }: MessageParams) {
  const escapedHost = host.replace(/\./g, "&#8203;.");

  return `
<body style="background: #ffffff;">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: #ffffff; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: #333333;">
        <strong>${escapedHost}</strong> にログイン
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="#0f1e51">
              <a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid #0f1e51; display: inline-block; font-weight: bold;">ログイン</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: #333333;">
        このメールに心当たりがない場合は無視してください。
      </td>
    </tr>
  </table>
</body>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: MessageParams) {
  return `${host} にログイン\n${url}\n\n`;
}

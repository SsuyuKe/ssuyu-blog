import axios from 'axios';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email 是必填' }), {
        status: 400,
      });
    }

    const formData = new URLSearchParams();
    formData.append('email', email);

    await axios.post(
      'https://systeme.io/embedded/33530433/subscription',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: '訂閱失敗，請稍後再試' }), {
      status: 500,
    });
  }
}

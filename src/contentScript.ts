(function() {
  console.log("Gmail Extension Starter is running.");

  async function getFirstUnreadEmailContent(): Promise<void> {
    const firstUnreadEmail = document.querySelector("tr.zA.zE") as HTMLElement | null;

    if (firstUnreadEmail) {
      // Simulate a click to open the email
      firstUnreadEmail.click();

      // Wait for the email content to load
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds

      // Get the email content
      const emailContentElement = document.querySelector("div.a3s") as HTMLElement | null;

      if (emailContentElement) {
        const emailContent = emailContentElement.innerText;

        alert(`First Unread Email Content:\n${emailContent.trim()}`);

        // Send emailContent to ChatGPT
        const response = await getChatGPTResponse(emailContent);

        alert(`ChatGPT Suggested Reply:\n${response.trim()}`);

        // Go back to the inbox
        window.history.back();
      } else {
        alert("Could not find the email content.");
      }
    } else {
      alert("Could not find the first unread email.");
    }
  }

  async function getChatGPTResponse(emailContent: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY as string;

    const prompt = `Read the following email and draft a reply:\n\n${emailContent}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data && data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      return 'No response from ChatGPT.';
    }
  }

  // Wait for the Gmail UI to load
  window.addEventListener('load', function() {
    // Find a target element to insert our button
    const target = document.querySelector("div[role='navigation']");

    if (target) {
      // Create a new button
      const button = document.createElement('button');
      button.textContent = "Get Reply Suggestion";
      button.style.margin = '10px';

      // Add a click event
      button.addEventListener('click', function() {
        getFirstUnreadEmailContent();
      });

      // Insert the button into the page
      target.prepend(button);
    }
  });
})();
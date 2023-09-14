document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const userInput = document.querySelector("#user-input");
    const sendBtn = document.querySelector("#send-btn");
    const voiceBtn = document.querySelector("#voice-btn");
    const voice = document.getElementById('voice');
  
    // Initialize SpeechRecognition object
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.continuous = true;
  
    // Function to create a chat message
    function createChatMessage(content, isUser) {
      const chatMessage = document.createElement("li");
      chatMessage.classList.add("chat", isUser ? "outgoing" : "incoming");
      chatMessage.innerHTML = isUser ? '<p></p>' : '<span class="material-symbols-outlined">smart_toy</span><p></p>';
      chatMessage.querySelector("p").textContent = content;
      return chatMessage;
    }
  
    // Function to add user message to chatbox
    function addUserMessage(message) {
      const chatMessage = createChatMessage(message, true);
      chatbox.appendChild(chatMessage);
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  
    // Function to add chatbot message to chatbox and speak it
    function addChatbotMessage(message) {
      const chatMessage = createChatMessage(message, false);
      chatbox.appendChild(chatMessage);
      chatbox.scrollTop = chatbox.scrollHeight;
  
      // Speak the chatbot's response
      speakChatbotResponse(message);
    }
  
    // Function to speak the chatbot's response
    function speakChatbotResponse(response) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(response);
      synth.speak(utterance);
    }
  
    // Function to generate movie genre recommendation
    function generateMovieGenreRecommendation(userInput) {
      userInput = userInput.toLowerCase(); // Convert user input to lowercase for case-insensitivity
  
      // Check for specific user inputs and provide movie genre recommendations
      if (userInput.includes('hi')) {
        return"hellow how can i help you";
      } else if (userInput.includes('body fitnes')) {
        return "ok cool!! i have a diet paln for you follow this";
      } else if (userInput.includes('comedy')) {
        return "Comedy movies are great for a good laugh. Check out:\n1. Superbad\n2. Anchorman\n3. The Hangover";
      } else if (userInput.includes('horror')) {
        return "Horror movies are perfect for a thrill. Try:\n1. The Conjuring\n2. Get Out\n3. A Quiet Place";
      } else if (userInput.includes('sci-fi')) {
        return "Science fiction movies explore futuristic concepts. Watch:\n1. Blade Runner\n2. Inception\n3. The Matrix";
      } else {
        return "I'm sorry, I don't have information on that genre. Please ask about action, drama, comedy, horror, or sci-fi for recommendations.";
      }
    }
  
    // Event listener for user input
    sendBtn.addEventListener('click', () => {
      const userMessage = userInput.value.trim();
  
      if (userMessage !== '') {
        addUserMessage(userMessage);
  
        // Generate movie genre recommendation based on user input
        const chatbotResponse = generateMovieGenreRecommendation(userMessage);
  
        setTimeout(() => {
          addChatbotMessage(chatbotResponse);
        }, 500); // Simulate chatbot response delay
      }
    });
  
    // Event listener for toggling the chatbot
    chatbotToggler.addEventListener("click", () => {
      document.body.classList.toggle("show-chatbot");
    });
  
    // Event listener for closing the chatbot
    closeBtn.addEventListener("click", () => {
      document.body.classList.remove("show-chatbot");
    });
  
    // Event listener for voice recognition
    voiceBtn.addEventListener("click", () => {
      recognition.start();
  
      recognition.onresult = function (event) {
        const result = event.results[event.results.length - 1][0].transcript;
        userInput.value = result;
      };
    });
  });
  
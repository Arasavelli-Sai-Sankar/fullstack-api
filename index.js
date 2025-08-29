const express = require('express');
const app = express();

app.use(express.json());

// User details - replace with your actual data as specified
const FULL_NAME = "arasavelli_sai_sankar"; // lowercase underscore format
const DOB = "28032005"; // ddmmyyyy format
const EMAIL = "saishankararasavelli28@gmail.com";
const ROLL_NUMBER = "222BCE9070";

// Root route for sanity check
app.get("/", (req, res) => {
  res.send("✅ Fullstack API is running. Use POST /bfhl");
});

// Main API endpoint
app.post('/bfhl', (req, res) => {
  try {
    const data = req.body.data || [];
    
    let odd = [], even = [], alpha = [], special = [];
    let sum = 0;
    let alphaChars = [];

    data.forEach(item => {
      let str = String(item);

      // Check if number
      if (/^\d+$/.test(str)) {
        let num = parseInt(str, 10);
        if (num % 2 === 0) even.push(str);
        else odd.push(str);
        sum += num;
      
      // Check if alphabets only
      } else if (/^[a-zA-Z]+$/.test(str)) {
        alpha.push(str.toUpperCase());
        alphaChars.push(...str.split('')); // Add each character
      } else {
        // Special characters or mixed chars
        special.push(str);
      }
    });

    // Create concatenated string: reverse all alphabets collected, alternate caps
    let concat = alphaChars.reverse()
      .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join('');

    // Build response object
    const response = {
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alpha,
      special_characters: special,
      sum: sum.toString(),
      concat_string: concat
    };

    res.status(200).json(response);

  } catch (error) {
    res.status(500).json({ is_success: false, error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

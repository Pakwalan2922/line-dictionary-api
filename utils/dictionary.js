const axios = require("axios");

const chat = async (prompt) => {
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${prompt}`);
    
    let meaningsByPartOfSpeech = { noun: [], verb: [] };

    response.data.forEach(entry => {
      entry.meanings.forEach(meaning => {
        const partOfSpeech = meaning.partOfSpeech;
        if ((partOfSpeech === 'noun' || partOfSpeech === 'verb') && meaning.definitions.length > 0) {
          meaningsByPartOfSpeech[partOfSpeech].push(meaning.definitions[0].definition);
        }
      });
    });

    let formatMeanings = '';
    for (const [partOfSpeech, definitions] of Object.entries(meaningsByPartOfSpeech)) {
      if (definitions.length > 0) {
        formatMeanings += `${partOfSpeech}: ${definitions.join('; ')}\n`;
      }
    }

    console.log('Formatted Meanings:\n', formatMeanings);

    // Respond with the meanings formatted from the dictionary API
    return formatMeanings.trim();
  } catch (error) {
    console.error('Error:', error);
    throw new Error('There was an error processing.');
  }
};

module.exports = { chat };
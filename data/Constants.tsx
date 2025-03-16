import dedent from 'dedent';
export default {
    PROMPT: dedent,

    AimodelList :[
        {
          name : 'Gemini Google',
          icon : '/google.png',
          modelName : 'google/gemini-2.0-pro-exp-02-05:free'
        },
        {
          name : 'llama By Meta',
          icon : '/meta.png',
          modelName : 'meta-llama/llama-3.3-70b-instruct:free'
        },
        {
          name : 'Deepseek',
          icon : '/deepseek.png',
          modelName : 'deepseek/deepseek-r1-zero:free'
        }
      ]
}


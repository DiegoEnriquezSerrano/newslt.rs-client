import ApiService from './ApiService';

const ChallengeService = {
  Api: {
    async getCaptcha(): Promise<Response> {
      const url = `${import.meta.env.VITE_API_URL}/captcha`;
      const opts = ApiService.requestInit();

      return await fetch(url, opts);
    },
  },
};

export default ChallengeService;

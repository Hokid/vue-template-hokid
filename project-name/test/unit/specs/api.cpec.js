import api from '@/api';

describe('API', () => {
  it('test', (done) => {
    api.get('/auth', null, { token: 'test' })
       .then((resp) => {
         done(resp)
       })
       .catch((er) => {
         done(er);
       });
  });
});

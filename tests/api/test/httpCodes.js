describe('GET / download', function(){
  it('should return a 200', function(){
    return supertest('http://localhost:3000')
      .get('/retrieve')
      .expect(200);
  })
});


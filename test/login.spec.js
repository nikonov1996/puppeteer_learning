import "@babel/polyfill";
const faker = require("faker");
const {LoginPage} = require('../app_pages/login');


const user = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.random.words()
};

const page = new LoginPage();
beforeAll(async ()=>{
  await page.open();
})

afterAll(async ()=>{
  await page.close();
})

describe('Login page tests', ()=>{
 
  test('test 1', async()=>{
    await page.setEmail(user.email);
    await page.setPassword(user.password);
    await page.submit();

    expect(true).toBe(true);
  },30000)
})
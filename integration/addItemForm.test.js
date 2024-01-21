
describe("addItemFormVisualTesting",()=>{
    it("BaseExample",async ()=>{
        //API from jest puppeteer

        await global.page.goto("http://localhost:3000/iframe.html?args=&viewMode=story&id=formforadditems--add-item-form-example");
        await global.page.waitForSelector('.sb-show-main')
        const image = await global.page.screenshot();

        //API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();

    })
})
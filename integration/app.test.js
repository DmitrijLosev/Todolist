
describe("allAppVisualTesting",()=>{
    it("AppBaseExample",async ()=>{
        //API from jest puppeteer

        await global.page.goto("http://localhost:6006/iframe.html?viewMode=story&id=appwithredux--app-with-redux-example&args=");
        await global.page.waitForSelector('.sb-show-main')
        const image = await global.page.screenshot();

        //API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();

    })
})
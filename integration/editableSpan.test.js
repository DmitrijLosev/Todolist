
describe("editableSpanVisualTesting",()=>{
    it("editableSpanBaseExample",async ()=>{
        //API from jest puppeteer

        await global.page.goto("http://localhost:6006/iframe.html?args=&viewMode=story&id=editablespan--editable-span-example");
        await global.page.waitForSelector('.sb-show-main')
        const image = await global.page.screenshot();

        //API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();

    })
})
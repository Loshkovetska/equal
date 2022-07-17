const blogApi = {

    async getMenu() {
        const fd = new FormData()

        fd.append("status", "category-blog")

        const responseRaw = await fetch('https://equaldev.romura.space/react/', {
            method: "POST",
            body: fd,
        })

        const form = await responseRaw.json()
        return form
    },

    async getBlog() {
        const fd = new FormData()

        fd.append("status", "blog")

        const responseRaw = await fetch('https://equaldev.romura.space/react/', {
            method: "POST",
            body: fd,
        })

        const form = await responseRaw.json()
        return form
    },

    async getArticle(id) {
        console.log("🚀 ~ file: blogApi.js ~ line 32 ~ getArticle ~ id", id)
        const fd = new FormData()

        fd.append("status", "single-blog")
        fd.append('id', id)

        const responseRaw = await fetch('https://equaldev.romura.space/react/', {
            method: "POST",
            body: fd,
        })

        const form = await responseRaw.json()
        return form
    }


}

export default blogApi;
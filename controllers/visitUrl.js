import connection from "../configs/db.js";


export const visitUrl = async (req, res) => {

    const short_url = req.params.url;
    console.log(short_url)

    try {

        const url = await connection.execute(`SELECT * FROM url_mapping WHERE short_url = "${short_url}"`)
        if (url[0].length === 0) return res.status(404).json({
            status: false,
            message: "URL not found!"
        })
        console.log(url)
        let clicks = url[0][0].count_clicks + 1

        await connection.execute(`UPDATE url_mapping SET count_clicks = ${clicks} WHERE short_url = "${short_url}"`)

        return res.status(200).json({ redirect_url: url[0][0].original_url, reponse: true })

    } catch (err) {
        return res.status(404).json({
            status: false,
            message: "URL not found!",
            response: err?.message
        })
    }
}
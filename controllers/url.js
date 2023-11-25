
import connection from "../configs/db.js";
// const id = nanoid(8)

export const generateOpenUrl = async (req, res) => {
    const { original_url, short_url, uid } = req.body;
    const user_id = process.env.admin;
    try {
        const result = await connection.execute(`INSERT INTO url_mapping(uid, original_url, short_url, user_id) VALUES ("${uid}", "${original_url}","${short_url}","${user_id}")`)
        if (result[0].affectedRows) return res.status(200).json({
            status: true,
            message: "Short URL generated",
            response: short_url

        })
    } catch (error) {

        return res.status(400).json({
            status: true,
            message: "Short URL generating failed",
            response: error.message

        })

    }
    // res.send(shortUrl)
}



export const generatePrivateUrl = async (req, res) => {
    const { original_url, short_url, uid, user_id } = req.body;

    try {
        const result = await connection.execute(`INSERT INTO url_mapping(uid, original_url, short_url, user_id) VALUES ("${uid}", "${original_url}","${short_url}","${user_id}")`)
        if (result[0].affectedRows) return res.status(200).json({
            status: true,
            message: "Short URL generated",
            response: short_url

        })
    } catch (error) {

        return res.status(400).json({
            status: true,
            message: "Short URL generating failed",
            response: error.message

        })

    }
}


export const getMyUrls = async (req, res) => {
    const { user_id } = req.body;

    try {
        const result = await connection.execute(`SELECT * FROM url_mapping WHERE user_id = ${user_id}`)
        return res.status(200).json({
            status: true,
            message: "URLs fetched successfuly",
            response: result[0]
        })
    } catch (err) {
        return res.status(404).json({
            status: true,
            message: "URLs fetching failed or Somthing went wrong!",
            response: err?.message

        })
    }

}


export const deleteUrl = async (req, res) => {
    const { url } = req.params;
    try {
        const urlAdmin = await connection.execute(`SELECT * FROM url_mapping WHERE uid = "${url}" OR short_url = "${url}"`)

        if (urlAdmin[0].length === 0) return res.status(404).json({
            status: false,
            message: "URL or URL ID not found",
        })

        if (urlAdmin[0][0].user_id !== req.body.user_id) return res.status(401).json({
            status: false,
            message: "Not authorized, Please login",
        })

        await connection.execute(`DELETE FROM url_mapping WHERE uid = "${url}" OR short_url = "${url}"`)

        return res.status(200).json({
            status: true,
            message: "URL deleted successful",
        })
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "URL deleted unsuccessful",
            response: err?.message
        })

    }
}

export const updateUrl = async (req, res) => {

    const { url } = req.params;
    try {
        const urlAdmin = await connection.execute(`SELECT * FROM url_mapping WHERE uid = "${url}" OR short_url = "${url}"`)

        if (urlAdmin[0].length === 0) return res.status(404).json({
            status: false,
            message: "URL or URL ID not found",
        })

        if (urlAdmin[0][0].user_id !== req.body.user_id) return res.status(401).json({
            status: false,
            message: "Not authorized, Please login",
        })

        await connection.execute(`UPDATE url_mapping SET original_url = "${req.body.original_url}" WHERE uid = "${url}" OR short_url = "${url}"`)

        return res.status(200).json({
            status: true,
            message: "URL updated successful",
        })
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: "URL update unsuccessful",
            response: err?.message
        })

    }

}








// import geoip from "geoip-lite";

// const getGeo = () => {
//     const geo = geoip.lookup("2409:40e3:60:22a7:4c64:d924:d5ab:fdb")
//     return geo
// }

// console.log(getGeo().country)



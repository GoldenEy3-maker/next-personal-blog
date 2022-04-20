import {Endpoint} from "../../../typescript/interfaces";
import {ResponseData} from "../../../typescript/types";
import {removeCookies} from "cookies-next";
import {CookieType} from "../../../typescript/enums";

const handler: Endpoint<ResponseData> = async (req, res) => {
  try {
    removeCookies(CookieType.Authorization, {req, res})

    res.redirect('/auth')
  } catch (err: any) {
    return res.status(400).json({
      success: false, data: null, message: err.message || 'Что-то пошло не так, попробуй' +
        ' снова'
    })
  }
}

export default handler
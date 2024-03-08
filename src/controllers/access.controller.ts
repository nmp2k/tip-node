import * as accessService from "../services/access.service";
const accessController = {};
export const signup = async (req, res, next) => {
  try {
    console.log(`[p]::signup::`, req.body);
    //code 201 => created
    return res.status(201).json(await accessService.signup(req.body));
  } catch (e) {
    // throw to middleware
    next(e);
  }
};

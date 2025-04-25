import { Router } from "express";
import { addLike, getLikes, removeLike } from "../controllers/likes/controller";
import paramsValidation from "../middlewares/params-validation";
import { addLikeValidator, removeLikeValidator } from "../controllers/likes/validator";

const likesRouter = Router()

likesRouter.get('/', getLikes)
likesRouter.post('/:vacationId', paramsValidation(addLikeValidator), addLike)
likesRouter.delete('/:vacationId', paramsValidation(removeLikeValidator), removeLike)

export default likesRouter;
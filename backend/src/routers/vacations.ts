import { Router } from "express";
import { createVacation, deleteVacation, getAllVacations, getAllVacationsCSV, getVacation, updateVacation } from "../controllers/vacations/controller";
import paramsValidation from "../middlewares/params-validation";
import { deleteVacationValidator, getVacationValidator, newVacationFilesValidator, newVacationValidator, updateVacationFilesValidator, updateVacationParamsValidator, updateVacationValidator } from "../controllers/vacations/validator";
import validation from "../middlewares/validation";
import filesValidation from "../middlewares/files-validation";
import fileUploader from "../middlewares/file-uploader";

const vacationsRouter = Router();

vacationsRouter.get('/', getAllVacations)
vacationsRouter.get('/csv', getAllVacationsCSV)
vacationsRouter.get('/:vacationId', paramsValidation(getVacationValidator), getVacation)
vacationsRouter.post('/', validation(newVacationValidator), filesValidation(newVacationFilesValidator), fileUploader, createVacation)
vacationsRouter.patch('/:vacationId', paramsValidation(updateVacationParamsValidator), validation(updateVacationValidator), filesValidation(updateVacationFilesValidator), fileUploader, updateVacation)
vacationsRouter.delete('/:vacationId', paramsValidation(deleteVacationValidator), deleteVacation)

export default vacationsRouter;
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../not-found/NotFound";
import List from "../../vacations/list/List";
import Edit from "../../vacations/edit/Edit";
import New from "../../vacations/new/New";
import Report from "../../vacations/report/Report";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={"/vacations"} />} />
            <Route path="/vacations" element={<List />} />
            <Route path="/add-vacation" element={<New />} />
            <Route path="/report" element={<Report />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />}/>
        </Routes>
    )
}

export default Routing;
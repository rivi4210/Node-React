import { useNavigate, useParams } from "react-router-dom";
import { useGetLessonByLevelQuery } from "./lessonApiSlice";
import { Button } from "primereact/button";
import { DataScroller } from "primereact/datascroller";
import { classNames } from "primereact/utils";

const LessonsByLevel = () => {
    const navigate=useNavigate()
    const { level } = useParams();
    console.log(level);
    const {
        data: lessons,
        isLoading,
        isError,
        error
    } = useGetLessonByLevelQuery(level)

    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>
    // if (lessons) return <h2></h2>
    console.log(lessons);

    const itemTemplate = (lesson, index) => {
    return (
                <div className="col-12" >
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    {/* <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} /> */}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{lesson.category}</div>
                            {/* <Rating value={product.username} readOnly cancel={false}></Rating> */}
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    {/* <i className="pi pi-tag"></i> */}
                                    <span className="font-semibold">{lesson.level}</span>
                                </span>
                                {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2" align='right'>
                        <Button label="Let's start" onClick={()=>navigate("/user/wordsByLesson/".concat(lesson._id),{ replace: false })}/>
                        {console.log(lesson._id)}
                        <Button label="Let's practice" onClick={()=>navigate("/user/questionsByLesson/".concat(lesson._id),{ replace: false })}/>
                        </div>
                    </div>
                </div>
            </div>
    )
}
return (
    <div className="card">
        <DataScroller value={lessons} itemTemplate={itemTemplate} rows={10000} inline scrollHeight="700px" />
    </div>
)}

export default LessonsByLevel
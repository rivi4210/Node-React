import { useNavigate, useParams } from "react-router-dom"
import { useGetWordsByIdLessQuery } from "../../AdminComp/Word/wordApiSlice";
import { DataScroller } from "primereact/datascroller";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Controller, useForm } from "react-hook-form";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import React,{ useRef, useState, useEffect} from "react";
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
// import { ProductService } from './service/ProductService';

const WordByLesson=()=>{

    const { idLess } = useParams();
    console.log(idLess);

    const navigate = useNavigate()
    const toast = useRef(null);

    // const [words, setProducts] = useState([]);
    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };
    
    // useEffect(() => {
    //     ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 9)));
    // }, []);

    const [formUpdate, setFormUpdate] = useState(false)

    const [_id, setId] = useState("")
    const [category, setCategory] = useState("")
    const [level, setLevel] = useState("")

    const [word, setWord] = useState({})

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const defaultValues = {
        // _id: '',
        word: '',
        translating: '',
        // lesson: '',
        Img: ''
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    // const onSubmit = (data) => {
    //     data.word && show();
    //     console.log({ _id, word: data.word, lesson: data.lesson, translating: data.translating });
    //     updatedWord({ _id, word: data.word, lesson: idLess, translating: data.translating, Img: data.Img })
    //     reset();
    //     setFormUpdate(false)
    //     // navigate('/admin/learn')
    // };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    const {
        data: words,
        isLoading,
        isError,
        error
    } = useGetWordsByIdLessQuery(idLess)
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>
    // if (!words?.length) return <h2>no words in this lesson!!!!!!!!!!!!!!</h2>


    const productTemplate = (w) => {
        return (
            <div className="border-3 surface-border border-round m-8 text-center py-5 px-10">
                <div className="mb-3">
                    <img src={w.Img? 'http://localhost:5225/upload/'.concat(w.Img) :""} alt={w.word} className="w-2 shadow-2" />
                </div>
                <div>
                    <h1 className="mb-1">{w.word}</h1>
                    <h2 className="mt-0 mb-3">{w.translating}</h2>
                    {/* <Tag value={word.inventoryStatus} severity={getSeverity(word)}></Tag> */}
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-search" className="p-button p-button-rounded" />
                        <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <Button icon="pi pi-arrow-left" onClick={()=>navigate("/user/lesson")} />
            <Carousel value={words} numScroll={1} numVisible={1} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
        </div>
    )

}
export default WordByLesson
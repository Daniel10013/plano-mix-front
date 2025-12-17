"use client"

import { PlusIcon } from "@heroicons/react/24/outline"
import AccordionClassification from "@/src/components/Classifications/AccordionClassification"
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { capitalizeWords } from "@/src/lib/utils";
import { getMix } from "@/src/services/classification.service";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Mix } from "@/src/types/Classifications/Classification";


export default function ListClassification() {

    const [isLoading, setLoading] = useState<boolean>(false);
    const [classificationData, setClassificationData] = useState<Mix[]>([]);


    function groupData(data: any) {
        const result: { [key: number]: any } = {};

        classificationData.forEach(item => {
            const { classification_id, classification, segment_id, segment, activity_id, activity } = item;

            if (!result[classification_id]) {
                result[classification_id] = {
                    classification_id,
                    classification,
                    segments: {}
                };
            }

            if (!result[classification_id].segments[segment_id!]) {
                result[classification_id].segments[segment_id!] = {
                    segment_id,
                    segment,
                    activities: []
                };
            }

            if (activity_id && activity) {
                result[classification_id].segments[segment_id!].activities.push({
                    activity_id,
                    activity
                });
            }
        });

        return Object.values(result).map(c => ({
            ...c,
            segments: Object.values(c.segments)
        }));
    }

    const grouped = groupData(classificationData);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getMix();
            setClassificationData(data);
        } catch (err: any) {
            toast.error("Erro em carregar as classificações");
        }
        finally {
            setLoading(false)
        }

    }

    return (
        <>
            <div className="w-full gap-4 flex flex-col items-center">
                <div className="flex xl:flex-row w-full xl:w-[60%] justify-between">
                    <h1 className="w-[50%] flex items-center text-3xl text-gray-500">Classificação</h1>
                    <button
                        onClick={() => { console.log("teste") }}
                        className="p-2 w-[15%] xl:w-[30%] bg-[#8173FF] text-white flex items-center justify-center xl:gap-2 rounded-[10px] transition-all duration-200 hover:bg-[#4f3fdd] cursor-pointer"
                    >
                        <span className="hidden xl:inline text-2xl">Nova Classificação</span>
                        <PlusIcon height={28} />
                    </button>
                </div>
                {isLoading ?
                    (
                        <>
                            <div className="w-full xl:w-[60%] space-y-2 flex flex-col xl:items-center gap-1">
                                {Array.from({ length: 7 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between w-full h-14 rounded-[10px] skeleton"
                                    />
                                ))}
                            </div>

                        </>
                    )
                    :
                    (
                        <>
                            <div className="w-full space-y-2 flex flex-col xl:items-center gap-1">
                                {grouped.map(classif => (
                                    <AccordionClassification
                                        key={classif.classification_id}
                                        title={
                                            <div className="flex items-center justify-between w-full">
                                                <span>{capitalizeWords(classif.classification)}</span>

                                                <div className="flex gap-1 xl:gap-2 xl:mr-10 mr-2 ">
                                                    <button
                                                        onClick={() => console.log("edit classification", classif.classification_id)}
                                                        className="p-1 hover:bg-gray-200 rounded"
                                                    >
                                                        <Pencil2Icon className="xl:w-6 xl:h-6 w-5 h-5 text-[#6DA7FF]" />
                                                    </button>

                                                    <button
                                                        onClick={() => console.log("delete classification", classif.classification_id)}
                                                        className="p-1 hover:bg-gray-200 rounded"
                                                    >
                                                        <TrashIcon className="xl:w-6 xl:h-6 w-5 h-5 text-[#FF6767]" />
                                                    </button>
                                                </div>
                                            </div>
                                        }
                                        className="w-full xl:w-[40%]"
                                    >
                                        {classif.segments.map((segment: any) => (
                                            <AccordionClassification
                                                key={segment.segment_id}
                                                title={
                                                    <div className="flex items-center justify-between w-full">
                                                        <span>{capitalizeWords(segment.segment)}</span>

                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => console.log("edit segment", segment.segment_id)}
                                                                className="p-1 hover:bg-gray-200 rounded"
                                                            >
                                                                <Pencil2Icon className="xl:w-5 xl:h-5 w-4 h-4 text-[#6DA7FF]" />
                                                            </button>

                                                            <button
                                                                onClick={() => console.log("delete segment", segment.segment_id)}
                                                                className="p-1 hover:bg-gray-200 rounded"
                                                            >
                                                                <TrashIcon className="xl:w-5 xl:h-5 w-4 h-4 text-[#FF6767]" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                }
                                                className="w-full xl:w-full"
                                            >
                                                {segment.activities.length === 0 ? (
                                                    <p className="text-sm text-gray-500">(sem atividades)</p>
                                                ) : (
                                                    segment.activities.map((act: any) => (
                                                        <div
                                                            key={act.activity_id}
                                                            className="p-2 text-sm rounded flex justify-between items-center"
                                                        >
                                                            {capitalizeWords(act.activity)}

                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => console.log("edit activity", act.activity_id)}
                                                                    className="p-1 hover:bg-gray-200 rounded"
                                                                >
                                                                    <Pencil2Icon className="xl:w-4 xl:h-4 w-3 h-3 text-[#6DA7FF]" />
                                                                </button>

                                                                <button
                                                                    onClick={() => console.log("delete activity", act.activity_id)}
                                                                    className="p-1 hover:bg-gray-200 rounded"
                                                                >
                                                                    <TrashIcon className="xl:w-4 xl:h-4 w-3 h-3 text-[#FF6767]" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </AccordionClassification>
                                        ))}
                                    </AccordionClassification>
                                ))}
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
}
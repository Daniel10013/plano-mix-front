"use client"

import { PlusIcon } from "@heroicons/react/24/outline"
import AccordionClassification from "@/src/components/Classifications/AccordionClassification"
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { capitalizeWords } from "@/src/lib/utils";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Mix } from "@/src/types/Classifications/Classification";
import ModalCreateClassification from "./Modal/ModalCreateClassification";
import ModalEditClassification from "./Modal/ModalEditClassification";
import type { Classification, Segment, Activity } from "@/src/types/Classifications/Classification";
import { getClassifications } from "@/src/services/classification.service";
import { getSegments } from "@/src/services/classification.service";
import { getActivities } from "@/src/services/classification.service";


export default function ListClassification() {

    const [isLoading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editIsOpen, setEditIsOpen] = useState<boolean>(false);
    const [classificationData, setClassificationData] = useState<Mix[]>([]);
    const [classifications, setClassifications] = useState<Classification[]>([]);
    const [segments, setSegments] = useState<Segment[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [fatherId, setFatherId] = useState<number>(0);

    const [name, setName] = useState<string>("");
    const [id, setId] = useState<number>(0);
    const [editType, setEditType] = useState<string>("");


    function groupData(data: Mix[]) {
        const result: { [key: number]: any } = {};

        data.forEach(item => {
            const {
                classification_id,
                classification,
                segment_id,
                segment,
                activity_id,
                activity
            } = item;

            if (!result[classification_id]) {
                result[classification_id] = {
                    classification_id,
                    classification,
                    segments: {}
                };
            }

            if (segment_id === null) {
                return;
            }

            if (!result[classification_id].segments[segment_id]) {
                result[classification_id].segments[segment_id] = {
                    segment_id,
                    segment,
                    activities: []
                };
            }

            if (activity_id !== null && activity) {
                result[classification_id].segments[segment_id].activities.push({
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
        getAllClassification();
    }, [])

    const getAllClassification = async () => {
        try {
            setLoading(true);

            const [classificationResponse, segmentResponse, activityResponse] = await Promise.all([
                getClassifications(),
                getSegments(),
                getActivities()
            ]);

            const classifications = classificationResponse?.data ?? [];
            const segments = segmentResponse?.data ?? [];
            const activities = activityResponse?.data ?? [];

            setClassifications(classifications);
            setSegments(segments);
            setActivities(activities);

            const mixData: Mix[] = [];

            classifications.forEach((c) => {
                const segmentsByClass = segments.filter(s => s.classification_id === c.id);

                if (segmentsByClass.length === 0) {
                    mixData.push({
                        classification_id: c.id,
                        classification: c.name,
                        segment_id: null,
                        segment: null,
                        activity_id: null,
                        activity: null
                    });
                    return;
                }

                segmentsByClass.forEach((s) => {
                    const activitiesBySegment = activities.filter(a => a.segment_id === s.id);

                    if (activitiesBySegment.length === 0) {
                        mixData.push({
                            classification_id: c.id,
                            classification: c.name,
                            segment_id: s.id,
                            segment: s.name,
                            activity_id: null,
                            activity: null
                        });
                        return;
                    }

                    // 🔹 Segmento COM atividades
                    activitiesBySegment.forEach((a) => {
                        mixData.push({
                            classification_id: c.id,
                            classification: c.name,
                            segment_id: s.id,
                            segment: s.name,
                            activity_id: a.id,
                            activity: a.name
                        });
                    });
                });
            });

            setClassificationData(mixData);

        } catch (error) {
            toast.error("Erro ao carregar classificações");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClassification = (id: number, name: string) => {
        setName(name);
        setId(id);
        setEditType("CLASSIFICACAO")
        setEditIsOpen(true);
    }
    const handleEditSegment = (id: number, name: string, classification_id: number) => {
        setName(name);
        setId(id);
        setEditType("SEGMENTO")
        setFatherId(classification_id)
        setEditIsOpen(true);
    }
    const handleEditActivity = (id: number, name: string, segment_id: number) => {
        setName(name);
        setId(id);
        setEditType("ATIVIDADE")
        setFatherId(segment_id)
        setEditIsOpen(true);
    }

    return (
        <>
            <ModalCreateClassification isOpen={isOpen} onClose={() => { setIsOpen(false) }} classifications={classifications} segments={segments} reloadClassification={() => { getAllClassification() }}></ModalCreateClassification>
            <ModalEditClassification isOpen={editIsOpen} onClose={() => { setEditIsOpen(false) }} nameEdit={name} idEdit={id} editType={editType} reloadClassification={() => { getAllClassification() }} fatherId={fatherId}></ModalEditClassification>
            <div className="w-full gap-4 flex flex-col items-center">
                <div className="flex xl:flex-row w-full xl:w-[60%] justify-between">
                    <h1 className="w-[50%] flex items-center text-3xl text-gray-500">Classificação</h1>
                    <button
                        onClick={() => { setIsOpen(true) }}
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
                                                        onClick={(e) => {e.stopPropagation();handleEditClassification(classif.classification_id, classif.classification)}}
                                                        className="p-1 hover:bg-gray-200 rounded"
                                                    >
                                                        <Pencil2Icon className="xl:w-6 xl:h-6 w-5 h-5 text-[#6DA7FF]" />
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
                                                                onClick={(e) => {e.stopPropagation();handleEditSegment(segment.segment_id, segment.segment, classif.classification_id )}}
                                                                className="p-1 hover:bg-gray-200 rounded"
                                                            >
                                                                <Pencil2Icon className="xl:w-5 xl:h-5 w-4 h-4 text-[#6DA7FF]" />
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
                                                                    onClick={(e) => {e.stopPropagation();handleEditActivity(act.activity_id, act.activity, segment.segment_id)}}
                                                                    className="p-1 hover:bg-gray-200 rounded"
                                                                >
                                                                    <Pencil2Icon className="xl:w-4 xl:h-4 w-3 h-3 text-[#6DA7FF]" />
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
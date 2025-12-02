'use client';

import Modal from "../../Layout/Modal/Modal";
import Select, { components } from "react-select";
import { Control, Option, SingleValue } from "../../Layout/Select/Select";

export default function ModalAddStoreVisit({ isOpen, onClose }: {
    isOpen: boolean,
    onClose: () => void,
    reloadStores: () => void,
}) {

    return (
        <Modal title="Cadastro de Loja" width={30} widthMobile={95} isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col w-full gap-4">
                <div>
                    <label className="text-[#535353] text-[20px]">Selecione a loja:</label>
                    <Select
                        className="w-full text-2xl"
                        components={{ Control, Option, SingleValue }}
                        styles={{
                            container: (base) => ({ ...base, flex: 1 }),
                            control: (base, state) => ({
                                ...base,
                                height: "100%",
                                cursor: "pointer",
                                minHeight: "2.75rem",
                                boxShadow: "none",
                                borderRadius: "10px",
                                borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                "&:hover": {
                                    borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                },
                            }),

                        }}
                        placeholder="Procure pela loja"
                        noOptionsMessage={() => "Nenhum item encontrado!"}
                        options={[
                            { id: 1, label: 'Option 1', subtitle: 'Loja Satelite, Atividade tal' }
                        ]}
                    />
                </div>
                <div>
                    <label className="text-[#535353] text-[20px]">Selecione a Loja a esquerda:</label>
                    <Select
                        className="w-full text-2xl"
                        components={{ Control, Option, SingleValue }}
                        styles={{
                            container: (base) => ({ ...base, flex: 1 }),
                            control: (base, state) => ({
                                ...base,
                                height: "100%",
                                cursor: "pointer",
                                minHeight: "2.75rem",
                                boxShadow: "none",
                                borderRadius: "10px",
                                borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                "&:hover": {
                                    borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                },
                            }),

                        }}
                        placeholder="Procure pela loja"
                        noOptionsMessage={() => "Nenhum item encontrado!"}
                        options={[
                            { id: 1, label: 'Option 1', subtitle: 'Loja Satelite, Atividade tal' }
                        ]}
                    />
                </div>
                <div>
                    <label className="text-[#535353] text-[20px]">Selecione a Loja a esquerda:</label>
                    <Select
                        className="w-full text-2xl"
                        components={{ Control, Option, SingleValue }}
                        styles={{
                            container: (base) => ({ ...base, flex: 1 }),
                            control: (base, state) => ({
                                ...base,
                                height: "100%",
                                cursor: "pointer",
                                minHeight: "2.75rem",
                                boxShadow: "none",
                                borderRadius: "10px",
                                borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                "&:hover": {
                                    borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                },
                            }),

                        }}
                        placeholder="Procure pela loja"
                        noOptionsMessage={() => "Nenhum item encontrado!"}
                        options={[
                            { id: 1, label: 'Option 1', subtitle: 'Loja Satelite, Atividade tal' }
                        ]}
                    />
                </div>
                <button className="w-full bg-[#8173FF] p-2 text-[22px] transition-all duration-200 cursor-pointer hover:bg-[#6050f5] rounded-[10px] text-white">
                    Adicionar Loja
                </button>
            </div>
        </Modal>
    )
}
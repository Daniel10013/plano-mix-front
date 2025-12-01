'use client';

import Select from "react-select";
import Modal from "../../Layout/Modal/Modal";

export default function ModalCreateUser({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return (
        <Modal title="Cadastrar Usuário" width={35} widthMobile={95} isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col w-full gap-3">
                <div>
                    <label className="text-[#535353] text-[20px]">Tipo de conta:</label>
                    <Select
                        className="w-full text-2xl"
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
                        placeholder="Selecione o tipo de conta"
                        noOptionsMessage={() => "Nenhum item encontrado!"}
                        options={[
                            {label: 'Comum', value: 'default'},
                            {label: 'Administrador', value: 'admin'},
                        ]}
                    />
                </div>
                <div>
                    <label className="text-[#535353] text-[20px]">Nome:</label>
                    <input type="text" placeholder="Nome da Silva"
                    className="w-full p-2 text-[20px] border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200" />
                </div>
                <div>
                    <label className="text-[#535353] text-[20px]">E-mail:</label>
                    <input type="text" placeholder="email@email.com"
                    className="w-full p-2 text-[20px] border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200" />
                </div>
                <button className="w-full bg-[#8173FF] p-2 text-[22px] transition-all duration-200 cursor-pointer hover:bg-[#6050f5] rounded-[10px] text-white">
                    Cadastrar
                </button>
            </div>
        </Modal>
    );
}
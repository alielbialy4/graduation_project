import { Modal } from "@mantine/core";
import { memo } from "react";

interface ModalComponentProps {
     isOpen: boolean;
     onClose: () => void;
     title: string;
     className?: string;
     children: React.ReactNode;
}

const ModalComponent = ({
     isOpen,
     onClose,
     title,
     className,
     children,
}: ModalComponentProps) => {
     return (
          <Modal
               opened={isOpen}
               onClose={onClose}
               centered
               size={1024}
               withCloseButton
               title={title}
               radius={15}
               classNames={{
                    header: "flex justify-center items-center bg-[#10b981] p-7",
                    title: "text-xl font-semibold text-center flex-1 text-white",
                    body: `px-7 ${className} dark:bg-darkLight bg-lightDark`,
                    close: "absolute right-4 top-4",
               }}
               closeButtonProps={
                    {
                         size: "lg",
                         style: {
                              color: "#fff",
                              backgroundColor: "rgba(255, 255, 255, 0.4)",
                         },
                    }
               }
          >
               {children}
          </Modal>
     );
};

export default memo(ModalComponent);

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
} from "@heroui/react";
import { AirQualityLog } from "../airquality/columns";

interface DynamicModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  data: AirQualityLog;
  obs: React.ReactNode;
  onClose: () => void;
}

export default function AirQualityModal({
  isOpen,
  onOpenChange,
  data,
  obs,
  onClose,
}: DynamicModalProps) {
  // console.log(data);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Dados</h1>
        </ModalHeader>
        <ModalBody>
          <div>
            <ul>
              {Object.entries(data).map(([chave, valor]) => (
                <li key={chave}>
                  <strong>{chave}:</strong> {valor}
                </li>
              ))}
            </ul>
          </div>
          Observações: {obs}
        </ModalBody>
        <ModalFooter>
          <Button onPress={onClose}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

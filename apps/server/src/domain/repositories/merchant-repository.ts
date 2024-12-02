import { MerchantProps } from "../entitites/merchant";

export interface MerchantRepository {
  save(merchant: MerchantProps): Promise<MerchantProps>;
  findById(_id: string): Promise<MerchantProps | null>;
  findByCNPJ(cnpj: string): Promise<MerchantProps | null>;
  findAll(): Promise<MerchantProps[]>;
}
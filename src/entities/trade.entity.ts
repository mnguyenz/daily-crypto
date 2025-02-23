import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { OrderSideEnum } from 'bingx-trading-api';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ASSETS, HYPHEN_SYMBOLS } from '~core/constants/crypto-code.constant';
import { AccountEnum, ExchangeEnum } from '~core/enums/exchanges.enum';

@Entity('Trade')
@Unique(['orderIdReference', 'exchange'])
export class TradeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: faker.string.numeric() })
    @Column()
    orderIdReference: string;

    @Column({ type: 'bigint' })
    tradeTime: bigint;

    @ApiProperty({ example: ASSETS.CRYPTO.BTC })
    @Column()
    asset: string;

    @ApiProperty({ example: HYPHEN_SYMBOLS.BTCUSDT })
    @Column()
    symbol: string;

    @ApiProperty({ example: OrderSideEnum.BUY })
    @Column()
    side: OrderSideEnum;

    @ApiProperty({ example: faker.number.float() })
    @Column('numeric')
    price: number;

    @ApiProperty({ example: faker.number.float() })
    @Column('numeric')
    quantity: number;

    @ApiProperty({ example: faker.number.float() })
    @Column('numeric')
    fee: number;

    @ApiProperty({ example: ASSETS.FIAT.USDT })
    @Column()
    feeAsset: string;

    @ApiProperty({ example: ExchangeEnum.BINANCE })
    @Column({ nullable: true })
    exchange: ExchangeEnum;

    @ApiProperty({ example: AccountEnum.M })
    @Column({ nullable: true })
    account: AccountEnum;
}

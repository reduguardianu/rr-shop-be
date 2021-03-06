import { getRepository, Repository, SelectQueryBuilder } from 'typeorm';

import { Order } from '../../entity/order';

export class OrderRepositoryService {
  public constructor(protected repository: Repository<Order> = getRepository(Order)) {}

  public async getAdminOrder(id: number): Promise<Order> {
    const selectQueryBuilder: SelectQueryBuilder<Order> = this.repository
      .createQueryBuilder('order')
      .select([
        'order',
        'orderItems',
        'orderItemsSupplies',
        ...['id', 'externalId'].map(c => `orderItemsProduct.${c}`),
        ...['filename'].map(c => `orderItemsProductImages.${c}`),
        'orderItemsProductSupplies',
        ...['id'].map(c => `orderItemsProductSuppliesOrderItem.${c}`),
        ...['number', 'status'].map(c => `orderItemsProductSuppliesOrderItemOrder.${c}`),
        'promoCode',
        'payments',
        'emails'
      ])
      .leftJoin('order.orderItems', 'orderItems')
      .leftJoin('orderItems.supplies', 'orderItemsSupplies')
      .leftJoin('orderItems.product', 'orderItemsProduct')
      .leftJoin('orderItemsProduct.images', 'orderItemsProductImages')
      .leftJoin('orderItemsProduct.supplies', 'orderItemsProductSupplies')
      .leftJoin('orderItemsProductSupplies.orderItem', 'orderItemsProductSuppliesOrderItem')
      .leftJoin('orderItemsProductSuppliesOrderItem.order', 'orderItemsProductSuppliesOrderItemOrder')
      .leftJoin('order.promoCode', 'promoCode')
      .leftJoin('order.payments', 'payments')
      .leftJoin('order.emails', 'emails')
      .where('order.id = :id', { id });

    return await selectQueryBuilder.getOne();
  }

  public async getAdminOrders(): Promise<Order[]> {
    const selectQueryBuilder: SelectQueryBuilder<Order> = this.repository
      .createQueryBuilder('order')
      .select(['order', 'orderItems'])
      .leftJoin('order.orderItems', 'orderItems')
      .orderBy('order.createdAt', 'DESC');

    return await selectQueryBuilder.getMany();
  }

  public async getOrder(uuid: string): Promise<Order> {
    const selectQueryBuilder: SelectQueryBuilder<Order> = this.repository
      .createQueryBuilder('order')
      .select([
        ...['uuid', 'number', 'status', 'createdAt', 'updatedAt'].map(c => `order.${c}`),
        ...[
          'uuid',
          'name',
          'priceUnitOriginal',
          'priceUnitSelling',
          'quantity',
          'type',
          'deliveryType',
          'paymentType',
          'productId'
        ].map(c => `orderItems.${c}`),
        ...['name', 'percentageDiscount'].map(c => `promoCode.${c}`),
        ...['uuid', 'amount', 'url', 'paymentType'].map(c => `payments.${c}`)
      ])
      .leftJoin('order.orderItems', 'orderItems')
      .leftJoin('order.promoCode', 'promoCode')
      .leftJoin('order.payments', 'payments')
      .where('order.uuid = :uuid', { uuid });

    return await selectQueryBuilder.getOne();
  }

  public async save(order: Order): Promise<Order> {
    return await this.repository.save(order);
  }
}

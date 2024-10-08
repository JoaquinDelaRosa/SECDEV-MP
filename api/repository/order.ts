
import { QueryResult, ResultSetHeader } from "mysql2";
import connection from "../config/connection";
import Customer, { CustomerRow } from "../models/customer";
import Order, { OrderRow } from "../models/order";
import { LIMIT_MAX } from "../config/limiterConfig";
import { queryBuilder, QueryValuePair } from "../utils/dbUtils";
import { RoleEnumRepository, StatusEnumRepository, TypeEnumRepository } from "./enums";
import { storeFile } from "../utils/fileUtils";
import { verify } from "crypto";

const ORDER_TABLE_NAME = "order";

export const OrderRespository = {
    retrieveAll(limit: number = LIMIT_MAX, offset?: number): Promise<Order[]> {
        let qv = queryBuilder.select("order o INNER JOIN statusenum s ON o.Status = s.Id INNER JOIN typeenum t ON o.TypeId = t.Id", [
            "o.Id", 
            "o.Status",
            "o.TimeIn",
            "o.TimeOut",
            "o.CustomerId",
            "o.TypeId",
            "o.VehicleId",
            "o.EstimateNumber",
            "o.ScopeOfWork",
            "o.IsVerified",
            `s.Name as "StatusName"`,
            `t.Name as "TypeName"`
        ]);
        queryBuilder.limit(qv, limit);
        queryBuilder.skip(qv, offset);

        return new Promise((resolve, reject) => {
            connection.execute<Order[]>(
                qv.query,
                qv.values,
                (err, res) => {
                    if (err) reject(err);
                    else {
                        const ordersWithStatus = res.map(order => ({
                            ...order,
                            Status: order.StatusName,
                            TypeId: order.TypeName
                        }));
                        resolve(ordersWithStatus);
                    }
                }
            );
        });
    },

    retrieveById(id: number): Promise<Order | undefined> {
        let qv = queryBuilder.select(
            "order o INNER JOIN statusenum s ON o.Status = s.Id INNER JOIN typeenum t ON o.TypeId = t.Id",
            [
                "o.Id",
                "o.Status",
                "o.TimeIn",
                "o.TimeOut",
                "o.CustomerId",
                "o.TypeId",
                "o.VehicleId",
                "o.EstimateNumber",
                "o.ScopeOfWork",
                "o.IsVerified",
                `s.Name as "StatusName"`,
                `t.Name as "TypeName"`
            ]
        );
        queryBuilder.where(qv, { Id: id });

        return new Promise((resolve, reject) => {
            connection.execute<Order[]>(
                qv.query,
                qv.values,
                (err, res) => {
                    if (err) reject(err);
                    else {
                        const order = res[0];
                        resolve({
                            ...order,
                            Status: order.StatusName,
                            TypeId: order.TypeName,
                        });
                    }
                }
            );
        });
    },

    async insert(object: OrderRow): Promise<number> {
        // It is assumed status and Time are IDs
        try {
            if (object.Invoice){
                try{
                    storeFile(object.Invoice, "pdf");
                }
                catch(err){
                    throw err;
                }
            }

            let qv = queryBuilder.insert(ORDER_TABLE_NAME, {
                Status: (await StatusEnumRepository.retrieveByName(object.Status)).Id,
                TimeIn: object.TimeIn,
                TimeOut: object.TimeOut,
                CustomerId: object.CustomerId,
                TypeId: (await TypeEnumRepository.retrieveByName(object.TypeId)).Id,
                VehicleId: object.VehicleId,
                EstimateNumber: object.EstimateNumber,
                ScopeOfWork: object.ScopeOfWork,
                IsVerified: object.IsVerified,
                Invoice: object.Invoice.filename,
            });

            return new Promise((resolve, reject) => {
                connection.execute<ResultSetHeader>(
                    qv.query,
                    qv.values,
                    (err, res) => {
                        if (err) reject(err);
                        else {
                            resolve(res.insertId);
                        }
                    }
                );
            });
        }
        catch (e) {
            console.log(e);
        }
    },

    async update(id: number, object: OrderRow): Promise<number> {
        let qv = queryBuilder.update(ORDER_TABLE_NAME, {
            Status: (await StatusEnumRepository.retrieveByName(object.Status)).Id,
            TimeIn: object.TimeIn,
            TimeOut: object.TimeOut,
            CustomerId: object.CustomerId,
            TypeId: (await TypeEnumRepository.retrieveByName(object.TypeId)).Id,
            VehicleId: object.VehicleId,
            EstimateNumber: object.EstimateNumber,
            ScopeOfWork: object.ScopeOfWork,
            IsVerified: object.IsVerified
        });
        queryBuilder.where(qv, { Id: id });

        return new Promise((resolve, reject) => {
            connection.execute<ResultSetHeader>(
                qv.query,
                qv.values,
                (err, res) => {
                    if (err) reject(err);
                    else {
                        resolve(id);
                    }
                }
            );
        });
    },

    async verify(id: number): Promise<number> {
        let qv_s = queryBuilder.select(ORDER_TABLE_NAME, ["IsVerified"])
        queryBuilder.where(qv_s, { Id: id });

        return new Promise((resolve, reject) => {
            connection.execute<Order[]>(
                qv_s.query,
                qv_s.values,
                (err, res) => {
                    if (err) reject(err);
                    else {
                        let qv_u = queryBuilder.update(ORDER_TABLE_NAME, {
                            IsVerified: ! res[0].IsVerified
                        });
                        queryBuilder.where(qv_u, {Id : id})

                        connection.execute<ResultSetHeader>(
                            qv_u.query,
                            qv_u.values,
                            (err, res) => {
                                if (err) reject(err);
                                else {
                                    resolve(id)
                                }
                            }
                        )
                    }
                }
            );
        });
    },


    delete(id: number): Promise<number> {
        let qv = queryBuilder.delete(ORDER_TABLE_NAME);
        queryBuilder.where(qv, { Id: id });

        return new Promise((resolve, reject) => {
            connection.execute<ResultSetHeader>(
                qv.query,
                qv.values,
                (err, res) => {
                    if (err) reject(err);
                    else {
                        resolve(id);
                    }
                }
            );
        });
    },

    count(): Promise<number> {
        let qv = queryBuilder.count(ORDER_TABLE_NAME);

        return new Promise((resolve, reject) => {
            connection.execute<QueryResult>(
                qv.query,
                qv.values,
                (err, res) => {
                    if (err) reject(err);
                    else {
                        resolve(res[0]['COUNT(*)']);
                    }
                }
            );
        });
    },

    filter(query: OrderQuery): Promise<Order[]> {
        let qv = makeSQLQuery(query);
        return new Promise((resolve, reject) => {
            connection.execute<Order[]>(
                qv.query,
                qv.values,
                (err, res) => {
                    if (err) reject(err);
                    else {
                        const ordersWithEnums = res.map(order => ({
                            ...order,
                            Status: order.StatusName,
                            TypeId: order.TypeName,
                        }));
                        resolve(ordersWithEnums);
                    };
                }
            );
        });
    },
};

export interface OrderQuery {
    Status?: string;
    TimeIn?: string;
    TimeOut?: string;
    CustomerId?: number;
    TypeId?: string;
    VehicleId?: number;
    EstimateNumber?: string;
    ScopeOfWork?: string;
    IsVerified?: boolean;
    limit?: number;
    skip?: number;
}

const makeSQLQuery = (query: OrderQuery): QueryValuePair => {
    let qv = queryBuilder.select(
        "order o INNER JOIN statusenum s ON o.Status = s.Id INNER JOIN typeenum t ON o.TypeId = t.Id",
        [
            "o.Id",
            "o.Status",
            "o.TimeIn",
            "o.TimeOut",
            "o.CustomerId",
            "o.TypeId",
            "o.VehicleId",
            "o.EstimateNumber",
            "o.ScopeOfWork",
            "o.IsVerified",
            `s.Name as "StatusName"`,
            `t.Name as "TypeName"`
        ]
    );
    queryBuilder.filter(qv, {
        "s.Name": query.Status,
        "t.Name": query.TypeId,
        "o.TimeIn": query.TimeIn,
        "o.TimeOut": query.TimeOut,
        "o.CustomerId": query.CustomerId,
        "o.VehicleId": query.VehicleId,
        "o.EstimateNumber": query.EstimateNumber,
        "o.ScopeOfWork": query.ScopeOfWork,
        "o.IsVerified": query.IsVerified
    });
    queryBuilder.limit(qv, query.limit || LIMIT_MAX);
    queryBuilder.skip(qv, query.skip);
    return qv;
}
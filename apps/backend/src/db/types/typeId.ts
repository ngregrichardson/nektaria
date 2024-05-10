import type { HasDefault } from "drizzle-orm";
import { customType } from "drizzle-orm/pg-core";
import { TypeID, typeid } from "typeid-js";

const typeIdType = <T extends string>(name: string, prefix: T) =>
	customType<{
		data: TypeID<T>;
		driverData: string;
		notNull: false;
		default: false;
	}>({
		dataType() {
			return "text";
		},
		toDriver: (value) => {
			return value.toString();
		},
		fromDriver: (value) => {
			return TypeID.fromString(value);
		},
	})(name);

function typeId<T extends string>(
	name: string,
	prefix: T,
	needsDefault: true,
): HasDefault<ReturnType<typeof typeIdType<T>>>;

function typeId<T extends string>(
	name: string,
	prefix: T,
	needsDefault?: false,
): ReturnType<typeof typeIdType<T>>;

function typeId<T extends string, K extends boolean>(
	name: string,
	prefix: T,
	needsDefault: K = false as K,
) {
	if (needsDefault) {
		return typeIdType(name, prefix).$default(() => typeid(prefix));
	}

	return typeIdType(name, prefix);
}

export default typeId;

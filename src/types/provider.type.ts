type ProviderProfile = {
    id: string;
    restaurantName: string;
    description: string;
    address: string;
    logo: string;
    phone: string;
    website: string;
    deliveryFee: number;
    isApproved: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export default ProviderProfile
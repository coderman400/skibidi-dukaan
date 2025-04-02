"use client"
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '../Navbar';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import AddListingModal from '../AddListingModal';
import EditListingModal from '../EditListingModal';
const SellerProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Mock seller data
  const seller = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    joinedDate: "April 2023",
    avatar: "/avatar.jpg",
    totalSales: 28,
    totalEarnings: 12450,
  };

  // Mock product listings with status
  const listings = [
    {
      id: 1,
      name: "Panini",
      price: 390,
      imgSrc: "/panini.jpg",
      isDeliverable: true,
      status: "active",
      dateAdded: "2025-03-28",
      views: 45,
    },
    {
      id: 2,
      name: "Burger",
      price: 250,
      imgSrc: "/panini.jpg",
      isDeliverable: false,
      status: "sold",
      dateAdded: "2025-03-15",
      views: 112,
      soldDate: "2025-03-30",
    },
    {
      id: 3,
      name: "Chicken Sandwich",
      price: 320,
      imgSrc: "/panini.jpg",
      isDeliverable: true,
      status: "pending",
      dateAdded: "2025-04-01",
      views: 12,
    },
    {
      id: 4,
      name: "Veggie Wrap",
      price: 280,
      imgSrc: "/panini.jpg",
      isDeliverable: true,
      status: "active",
      dateAdded: "2025-03-25",
      views: 38,
    },
  ];

  return (
    <div className='w-[85vw]'>
        <Navbar />
        <div className="container mx-auto py-8 px-4">
          {/* Enhanced Seller Profile Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Seller Info Card */}
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center gap-6 pb-2">
                <Avatar className="h-24 w-24 border-4 border-primary/10">
                  <AvatarImage src={seller.avatar} alt={seller.name} />
                  <AvatarFallback className="text-2xl">{seller.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <CardTitle className="text-2xl">{seller.name}</CardTitle>
                  <CardDescription className="text-base">{seller.email}</CardDescription>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">Seller</Badge>
                    <CardDescription>Member since {seller.joinedDate}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-6 mt-2">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Total Sales</span>
                    <span className="text-2xl font-bold">{seller.totalSales}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Active Listings</span>
                    <span className="text-2xl font-bold">{listings.filter(l => l.status === 'active').length}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Completed</span>
                    <span className="text-2xl font-bold">{listings.filter(l => l.status === 'sold').length}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
              <AddListingModal 
                trigger={
                  <Button className="gap-2">
                    <PlusCircle size={18} />
                    Add New Listing
                  </Button>
                }
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
              />
               
              </CardFooter>
            </Card>

            {/* Total Earnings Card */}
            <Card className="bg-gradient-to-br from-primary/90 to-primary flex flex-col justify-center">
              <CardContent className="flex flex-col items-center justify-center h-full py-6">
                <h3 className="text-xl font-medium text-primary-foreground mb-2">Total Earnings</h3>
                <div className="text-4xl md:text-5xl font-bold text-primary-foreground">
                  ₹{seller.totalEarnings.toLocaleString()}
                </div>
                <p className="text-primary-foreground/80 mt-2 text-center">
                  From {seller.totalSales} successful sales
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Listings Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Listings</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="sold">Sold</TabsTrigger>
            </TabsList>

            {/* All Listings Tab */}
            <TabsContent value="all">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">All Listings</h2>
                <AddListingModal 
                trigger={
                  <Button variant="outline" className="gap-2">
                  <PlusCircle size={16} />
                  New Listing
                </Button>
                }
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
              />
                
                
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </TabsContent>

            {/* Active Listings Tab */}
            <TabsContent value="active">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Active Listings</h2>
                <AddListingModal 
                trigger={
                  <Button variant="outline" className="gap-2">
                  <PlusCircle size={16} />
                  New Listing
                </Button>
                }
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
              />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {listings
                  .filter((listing) => listing.status === "active")
                  .map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
              </div>
            </TabsContent>

            {/* Sold Listings Tab */}
            <TabsContent value="sold">
              <h2 className="text-2xl font-semibold mb-4">Sold Listings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {listings
                  .filter((listing) => listing.status === "sold")
                  .map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
    </div>
  );
};
// Updated ListingCard component
const ListingCard = ({ listing }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full">
        <img
          src={listing.imgSrc}
          alt={listing.name}
          className="h-full w-full object-cover"
        />
        <Badge 
          className={`absolute top-2 right-2 ${
            listing.status === 'active' ? 'bg-green-500' : 
            listing.status === 'sold' ? 'bg-blue-500' : 
            'bg-yellow-500'
          }`}
        >
          {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{listing.name}</h3>
          <span className="font-bold">₹{listing.price}</span>
        </div>
        <div className="text-sm text-gray-500 space-y-1">
          <p>Listed: {new Date(listing.dateAdded).toLocaleDateString()}</p>
          <p>Views: {listing.views}</p>
          {listing.isDeliverable ? (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              Delivery Available
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
              No Delivery
            </Badge>
          )}
          {listing.soldDate && (
            <p>Sold on: {new Date(listing.soldDate).toLocaleDateString()}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <EditListingModal
          trigger={
            <Button variant="outline" size="sm" className="flex-1">
              Edit
            </Button>
          }
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          listing={listing}
        />
        
      </CardFooter>
    </Card>
  );
};


export default SellerProfile;

#!/bin/bash

export AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test

# Create bucket
awslocal s3 mb s3://il.co.johnbryce.shaihey

# Upload all images
awslocal s3 cp /init-data/68d74d21-08f6-4824-a461-3d84f0aa76b5.jpeg s3://il.co.johnbryce.shaihey/
awslocal s3 cp /init-data/328925a2-4345-43fc-94bd-6c5636fd6d95.jpeg s3://il.co.johnbryce.shaihey/
awslocal s3 cp /init-data/04476895-cc2f-4343-ade1-8dc9f94dc3ec.jpeg s3://il.co.johnbryce.shaihey/
awslocal s3 cp /init-data/84846167-ea16-4f26-a811-3b1512dd4d5d.jpg s3://il.co.johnbryce.shaihey/
awslocal s3 cp /init-data/b7c98a62-a264-4934-a307-dc236065a75f.jpeg s3://il.co.johnbryce.shaihey/
awslocal s3 cp /init-data/b8d05d25-6a52-4ab5-aa7a-53560318ddb8.jpeg s3://il.co.johnbryce.shaihey/
awslocal s3 cp /init-data/b3270794-da90-443f-bf04-5cdabd6a2f24.jpeg s3://il.co.johnbryce.shaihey/
awslocal s3 cp /init-data/bd188091-eda1-417e-b0be-4132b87f35d8.jpg s3://il.co.johnbryce.shaihey/
awslocal s3 cp /init-data/bec45a0c-d8ff-468b-ae0d-11b3ca5d8d01.jpg s3://il.co.johnbryce.shaihey/
awslocal s3 cp /init-data/c7780a3d-f5de-48d3-a4cb-717219969328.jpeg s3://il.co.johnbryce.shaihey/
awslocal s3 cp /init-data/df6a8482-7038-416d-a96a-a172f343d1d3.jpeg s3://il.co.johnbryce.shaihey/
awslocal s3 cp /init-data/fc3c0c49-7526-4c9c-b66a-8954993e2c0b.jpeg s3://il.co.johnbryce.shaihey/
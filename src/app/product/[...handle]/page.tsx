import { Suspense } from "react";
import Loading from "@/app/product/[...handle]/loading";
import { getProduct } from "@/lib";
import Image from "next/image";
import { ArrowLongLeftIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Accordion from "@/components/Accordion";
import Tabs from "@/components/Tabs";

export default async function ProductPage({
  params,
}: {
  params: { handle: string[] };
}) {
  const product = await getProduct(params.handle[0]);

  if (product === undefined) return null;

  return (
    <Suspense fallback={<Loading />}>
      <div className="p-4">
        <Link href="/category" className="flex items-center gap-2">
          <ArrowLongLeftIcon className="h-5 w-5" />
          Back
        </Link>
      </div>

      <section className="mx-auto grid max-w-screen-lg grid-cols-2">
        {product?.images?.length > 0 ? (
          <Image
            src={product?.images[0]}
            width={300}
            height={300}
            className="object-contain p-4"
            alt={product?.title + " image 01"}
            priority
          />
        ) : (
          <div className="flex h-96 w-96 items-center justify-center rounded-2xl bg-gray-100 p-4">
            <PhotoIcon className="h-20 w-20 text-gray-200" />
          </div>
        )}

        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2>{product?.manufacturer}</h2>
            <small className="ml-2 text-gray-400">{product?.id}</small>
          </div>

          <h1 className="text-2xl">{product?.title}</h1>

          <p>{product?.description}</p>

          <ul className="mt-4 grid gap-2">
            <li>
              <Accordion title="Description" content={product?.description} />
            </li>
          </ul>
        </div>
      </section>

      <section className="p-4">
        <Tabs tabs={product?.tabs} />
      </section>
    </Suspense>
  );
}

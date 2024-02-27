import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { sidebarNav } from "@/routes";
import { onKeyDown } from "@/lib/utils";
import { ProductType } from "@/types/product";
import useUploadProductMutation from "@/hooks/product/useUploadProductMutation";
import useUploadProduct from "@/hooks/product/useUploadProduct";
import Combobox from "./ui/comboBox";
import Alert from "./alert";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";

export default function AddProductForm({ product }: { product?: ProductType }) {
  const isEdit = product ? true : false;
  const { uploadProduct, isPending, mutationShowAlert, setMutationShowAlert, mutationAlertContent } =
    useUploadProductMutation(isEdit);
  const {
    previewImages,
    category,
    setCategory,
    onSubmit,
    addImages,
    deleteImage,
    form,
    showAlert,
    setShowAlert,
    alertContent,
  } = useUploadProduct(uploadProduct, product);
  const navigate = useNavigate();

  return (
    <>
      <Alert showAlert={showAlert} setShowAlert={setShowAlert} alertContent={alertContent} />
      <Alert showAlert={mutationShowAlert} setShowAlert={setMutationShowAlert} alertContent={mutationAlertContent} />

      <div className="text-zinc-900">
        <Form {...form}>
          {
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex mt-10 flex-row justify-between items-end">
                <div>상품 정보</div>
                <div className="text-xs text-zinc-600">* 필수입력사항</div>
              </div>
              <div className="hidden md:grid border border-zinc-300 rounded p-8 mt-3 md:grid-cols-103 md:gap-4">
                <FormLabel>카테고리 *</FormLabel>
                <FormField
                  control={form.control}
                  name="category"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Combobox categories={sidebarNav} category={category} setCategory={setCategory} />
                      </FormControl>
                      <div className="hidden md:flex">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <div />
                <FormLabel>상품명 *</FormLabel>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} onKeyDown={onKeyDown} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div />
                <FormLabel>판매가 *</FormLabel>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="number" onKeyDown={onKeyDown} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div />
                <FormLabel>재고수량 *</FormLabel>
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="number" onKeyDown={onKeyDown} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div />
                {/* <div className="col-span-2">dd</div> */}
                <FormLabel>상품이미지 *</FormLabel>
                <div className="grid-cols-subgrid col-span-2">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex overflow-x-scroll">
                            <div className="flex">
                              {previewImages?.map((image, id) => (
                                <div key={id} className="w-28 h-28 relative mr-2">
                                  <img
                                    src={image}
                                    alt={`${image}-${id}`}
                                    className="w-full h-full absolute rounded"
                                    width={112}
                                    height={112}
                                  />
                                  <button
                                    id="delete_image"
                                    onClick={(e) => deleteImage(e, id)}
                                    className="absolute right-1 top-1 bg-zinc-900 bg-opacity-20 rounded"
                                  >
                                    <X width={16} height={16} color="white" />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <Label htmlFor="input-file">
                              <div className="flex justify-center items-center w-28 h-28 rounded border border-zinc-400 bg-zinc-100">
                                <Plus />
                                <input
                                  {...field}
                                  type="file"
                                  className="hidden"
                                  multiple
                                  id="input-file"
                                  onChange={addImages}
                                  onKeyDown={onKeyDown}
                                />
                              </div>
                            </Label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormLabel>상품설명 *</FormLabel>
                <div className="grid-cols-subgrid col-span-2 w-[70%]">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <textarea
                            {...field}
                            className="text-zinc-800 text-sm pl-3 pt-2 border border-zinc-400 rounded w-full h-44 resize-none"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" mt-6 mb-3 text-base">부가정보</div>
                <div />
                <div />

                <FormLabel>Artist</FormLabel>
                <FormField
                  control={form.control}
                  name="artist"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div />
                <FormLabel>Label</FormLabel>
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} onKeyDown={onKeyDown} />
                      </FormControl>
                      {/* <div className="hidden md:flex">
                      <FormMessage />
                    </div> */}
                    </FormItem>
                  )}
                />
                <div />
                <FormLabel>Released</FormLabel>
                <FormField
                  control={form.control}
                  name="released"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} onKeyDown={onKeyDown} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div />
                <FormLabel>Format</FormLabel>
                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} onKeyDown={onKeyDown} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div />
              </div>
              <div className="md:hidden grid grid-cols-302 gap-3 border border-zinc-300 rounded p-8 mt-3">
                <FormLabel>카테고리 *</FormLabel>
                <FormField
                  control={form.control}
                  name="category"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Combobox categories={sidebarNav} category={category} setCategory={setCategory} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* <div className="bg-yellow-400"></div> */}
                <FormLabel>상품명 *</FormLabel>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="bg-zinc-100">
                      <FormControl>
                        <Input {...field} onKeyDown={onKeyDown} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormLabel>판매가 *</FormLabel>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="number" onKeyDown={onKeyDown} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormLabel>재고수량 *</FormLabel>
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="number" onKeyDown={onKeyDown} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormLabel>상품이미지 *</FormLabel>
                <div />
                <div className="overflow-x-scroll grid-cols-subgrid col-span-2">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex">
                            <div className="flex">
                              {previewImages?.map((image, id) => (
                                <div key={id} className="w-20 h-20 relative mr-2">
                                  <img
                                    src={image}
                                    alt={`${image}-${id}`}
                                    width={80}
                                    height={80}
                                    className="w-full h-full absolute rounded"
                                  />
                                  <button
                                    id="delete_image"
                                    onClick={(e) => deleteImage(e, id)}
                                    className="absolute right-1 top-1 bg-zinc-900 bg-opacity-20 rounded"
                                  >
                                    <X width={16} height={16} color="white" />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <Label htmlFor="input-file">
                              <div className="flex justify-center items-center w-20 h-20 rounded border border-zinc-400 bg-zinc-100">
                                <Plus />
                                <input
                                  {...field}
                                  type="file"
                                  className="hidden"
                                  multiple
                                  id="input-file"
                                  onChange={addImages}
                                  onKeyDown={onKeyDown}
                                />
                              </div>
                            </Label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormLabel>상품설명 *</FormLabel>
                <div className="grid-cols-subgrid col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <textarea
                            {...field}
                            className="text-zinc-800 text-sm pl-3 pt-2 border border-zinc-400 rounded w-full h-36 resize-none"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6 mb-3 text-base">부가정보</div>
                <div />

                <FormLabel>Artist</FormLabel>
                <FormField
                  control={form.control}
                  name="artist"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormLabel>Label</FormLabel>
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} onKeyDown={onKeyDown} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormLabel>Released</FormLabel>
                <FormField
                  control={form.control}
                  name="released"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} onKeyDown={onKeyDown} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormLabel>Format</FormLabel>
                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} onKeyDown={onKeyDown} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div />
              </div>
              <div className="flex w-full justify-center gap-4">
                <Button
                  type="button"
                  onClick={() => {
                    if (confirm("상품 등록을 취소하시겠습니까?")) {
                      navigate(-1);
                    }
                  }}
                  id="upload_product"
                  className="mt-6 mb-12 w-32 bg-white border border-zinc-700 text-zinc-700 hover:bg-zinc-100"
                  disabled={isPending}
                >
                  취소하기
                </Button>
                <Button
                  id="upload_product"
                  type="submit"
                  className="mt-6 mb-12 w-32 bg-zinc-700  hover:bg-zinc-800"
                  disabled={isPending}
                >
                  상품 등록
                </Button>
              </div>
            </form>
          }
        </Form>
      </div>
    </>
  );
}

import axios from "axios"
import { useEffect, useState } from "react"
import toast, { Toaster } from 'react-hot-toast'

//import icon
import { TbSteeringWheel } from 'react-icons/tb'
import { MdEventSeat } from 'react-icons/md'
import Bus from './../gambar/bus.png'

//import css
import './bus.css'
// import logostar from './../gambar/logostar.png'

export default function BusSeat() {
    let [data, setData] = useState([]), [seatL, setSeatL] = useState([]), [seatR, setSeatR] = useState([])
    let [selectedSeat, setSelectedSeat] = useState([])
    let getDataBus = async () => {
        try {
            let response = await axios.get('https://s-challenge-raja-ongkir-api-n5cm.vercel.app/bus/details')
            console.log(response.data.data[0].category[1].travel.lists[0])
            setData(response.data.data[0].category[1].travel.lists[0])

            let loaderLeft = [], loaderRight = []
            let a = 1
            while (a < response.data.data[0].category[1].travel.lists[0].total_left_seat) {
                loaderLeft.push(`${a}${response.data.data[0].category[1].travel.lists[0].left_row_name[0]}`)
                a++
                loaderLeft.push(`${a}${response.data.data[0].category[1].travel.lists[0].left_row_name[1]}`)
                a++
            }
            a = 1
            while (a < response.data.data[0].category[1].travel.lists[0].total_right_seat) {
                loaderRight.push(`${a}${response.data.data[0].category[1].travel.lists[0].right_row_name[0]}`)
                a++
                loaderRight.push(`${a}${response.data.data[0].category[1].travel.lists[0].right_row_name[1]}`)
                a++
            }
            setSeatL(loaderLeft)
            setSeatR(loaderRight)
            console.log(loaderRight)

        } catch (error) {
            console.log(error)
        }
    }

    let submit = (input) => {
        let loader = [...selectedSeat]
        let dataLoader = { ...data }
        if (loader.includes(input)) {
            let newLoader = loader.filter(x => x != input)
            setSelectedSeat(newLoader)
            dataLoader.total_seat_booked += 2
            return setData(dataLoader)
        }
        if (selectedSeat.length > 2) return toast.error('Maksimum memilih bangku hanya 3!', {
            style: {
                background: "black",
                color: "white"
            }
        })
        loader.push(input)
        dataLoader.total_seat_booked += 2
        setData(dataLoader)
        setSelectedSeat(loader)
    }

    useEffect(() => {
        getDataBus()
    }, [])


    return (
        <div className=" bigContainer bg-black flex items-center justify-center w-full ">
            <div className="container w-4/5 flex gap-7 text-white  h-full my-10 py-10">
                <div className="w-1/2  flex flex-col">

                    <img src={Bus} alt="Bus Day Trans" />

                    <div className="text-3xl mt-1 font-semibold">{data.travel_name}</div>

                    <div className="text-gray-500">Exclusive Class</div>

                    {data.price?
                    <div className="text-xl font-bold mb-3">Rp. {(data.price).toLocaleString()}</div>
                    :
                    null
                    }
                    

                    <div>30 Seat Available</div>

                    <div className="mt-1 mb-5 progress w-75">
                        <div className="progress-bar bg-success" role="progressbar" style={{ width: `${data.total_seat}/${data.total_seat_booked}` }}></div>
                    </div>
                    <div className=" text-xl font-semibold">
                        View Seat
                    </div>

                    <div className="flex flex-col h-full w-1/2 p-3 gap-3">
                        <div className="flex justify-end w-3/4 pr-3"><TbSteeringWheel className="w-6 h-6" /></div>
                        <div className="flex gap-5">
                            <div className="flex flex-wrap w-1/3 gap-5 ">
                                {
                                    seatL.length == 0 ?
                                        null
                                        :
                                        seatL.map((item, index) => {
                                            return (
                                                data.seat_booked.includes(item) ?
                                                    <div className="flex flex-col text-red-500 ">
                                                        <MdEventSeat className="h-6 w-6 color-red-500" />
                                                        <div className="pl-0.5">{item}</div>
                                                    </div>
                                                    :
                                                    selectedSeat.includes(item) ?
                                                        <div onClick={() => submit(item)} className="flex flex-col text-emerald-500" style={{}}>
                                                            <MdEventSeat className="h-6 w-6 color-emerald-500" />
                                                            <div className="pl-0.5">{item}</div>
                                                        </div>
                                                        :
                                                        <div onClick={() => submit(item)} className="flex flex-col" style={{}}>
                                                            <MdEventSeat className="h-6 w-6" />
                                                            <div className="pl-0.5">{item}</div>
                                                        </div>
                                            )
                                        })
                                }
                            </div>

                            <div className="seatR flex flex-wrap w-1/3 gap-5 ">
                                {
                                    seatR.length == 0 ?
                                        null
                                        :
                                        seatR.map((item, index) => {
                                            return (
                                                data.seat_booked.includes(item) ?
                                                    <div className="flex flex-col text-red-500">
                                                        <MdEventSeat className="h-6 w-6 color-red-500" />
                                                        <div className="pl-0.5">{item}</div>
                                                    </div>
                                                    :
                                                    <div className="flex flex-col">
                                                        <MdEventSeat className="h-6 w-6" />
                                                        <div className="pl-0.5">{item}</div>
                                                    </div>
                                            )
                                        })
                                }

                            </div>
                        </div>
                        {/* seat box */}
                    </div>



                    {/* box kiri */}
                </div>


                <div className="w-1/2  flex flex-col px-2">
                    <div className="text-2xl font-semibold ">Summary</div>
                    <hr className="w-full bg-white mb-3" />
                    <div className="flex">
                        <div className="w-1/2 text-lg font-medium">Tanggal Berangkat</div>
                        <div>: 2023-01-25</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 text-lg font-medium">Dari</div>
                        <div>: {data.from}</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 text-lg font-medium">Menuju</div>
                        <div>: {data.to}</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 text-lg font-medium">Total Seat</div>
                        <div>: {data.total_seat}</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 text-lg font-medium">Selected Seat</div>
                        <div>: {selectedSeat.join(',')}</div>
                    </div>
                    <hr className="bg-white w-full mt-2" />


                    {selectedSeat.length == 0 ?
                        null
                        :
                        <div className="flex ml-4 mt-3">
                            <div className="text-2xl w-1/2 font-semibold">Total Price</div>
                            <div className="text-2xl">: Rp. {(data.price*selectedSeat.length).toLocaleString()} </div>
                        </div>
                    }



                    {/* box kanan */}
                </div>
                {/* container dalam */}
            </div>
            {/* container luar */}
            <Toaster />
        </div>
    )
}
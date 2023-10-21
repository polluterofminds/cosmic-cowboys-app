import { useState, useRef, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'


export default function ModalVideo({
  thumb,
  thumbWidth,
  thumbHeight,
  thumbAlt,
  video,
  videoWidth,
  videoHeight,
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const videoRef = useRef(null)

  return (
    <div>

      {/* Video thumbnail */}
      <button
        className="relative hover:scale-105 transition-all duration-300 ease-in-out flex justify-center items-center focus:outline-none rounded-3xl group"
        onClick={() => { setModalOpen(true) }}
        aria-label="Watch the video"
      >
        <img className="rounded-3xl shadow-2xl transition-shadow duration-300 ease-in-out" src={thumb} width={thumbWidth} height={thumbHeight} priority alt={thumbAlt} />
        {/* Play icon */}
      </button>
      {/* End: Video thumbnail */}

      <Transition show={modalOpen} as={Fragment} afterEnter={() => videoRef.current?.play()}>
        <Dialog initialFocus={videoRef} onClose={() => setModalOpen(false)}>

          {/* Modal backdrop */}
          <Transition.Child
            className="fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            aria-hidden="true"
          />
          {/* End: Modal backdrop */}

          {/* Modal dialog */}
          <Transition.Child
            className="fixed inset-0 z-10 flex p-6"
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 scale-75"
            enterTo="opacity-100 scale-100"
            leave="transition ease-out duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            <div className="max-w-5xl mx-auto h-full flex items-center">
              <Dialog.Panel className="w-full max-h-full rounded-3xl shadow-2xl aspect-video bg-black overflow-hidden">
                <video ref={videoRef} width={videoWidth} height={videoHeight} loop controls>
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Dialog.Panel>
            </div>
          </Transition.Child>
          {/* End: Modal dialog */}

        </Dialog>
      </Transition>

    </div>
  )
}

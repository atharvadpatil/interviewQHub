import Link from "next/link";

export default function Form({ type, post, setPost, submitting, handleSubmit }) {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Question</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and Share your interview questions to empower others on their career journeys, providing them with valuable insights and helping them confidently navigate the path to success.
      </p>
      <form
        onSubmit={handleSubmit}
        className='mt-6 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your Interview Question
          </span>

          <textarea
            value={post.que}
            onChange={(e) => setPost({ ...post, que: e.target.value })}
            placeholder='Write your question here'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Company Name{" "}
            <span className='font-normal'>
              (#amazon, #microsoft, #google, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#comany'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>


      </form>
    </section>
  )
}

import asyncio


async def task_one():
    print("Task 1 started")
    await asyncio.sleep(3)
    print("Task 1 finished")


async def task_two():
    print("Task 2 started")
    await asyncio.sleep(2)
    print("Task 2 finished")


async def main():
    await asyncio.gather(
        task_one(),
        task_two()
    )


asyncio.run(main())
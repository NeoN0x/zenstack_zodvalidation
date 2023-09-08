async function run() {
  const idSample = new Date().toISOString();

  const deleteUrl = "http://localhost:3001/api/model/SimpleItem/delete?" +
  new URLSearchParams({
    q: JSON.stringify({
      where: {
        createdAt: { lt: new Date() },
      },
    }),
  })
  const respDelete = await fetch(deleteUrl,
    {
      method: "delete",
    },
  );

  console.log("Delete resp", {
    url: deleteUrl,
    status: respDelete.status,
    body: await respDelete.text(),
  });

  console.error('----> 1. Why do the delete where did not worked ? It seems passed correctly')

  const respCreate = await fetch(
    "http://localhost:3001/api/model/SimpleItem/create",
    {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: {
          id: idSample,
          name: "1",
        },
      }),
    },
  );

  console.log("Create resp", {
    status: respCreate.status,
    body: await respCreate.text(),
  });

  console.error('----> 2.This create should not pass as per the minlength : name String @length(3, 5)')

  const respUpdate = await fetch(
    "http://localhost:3001/api/model/SimpleItem/update",
    {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: {
          name: "123456789",
        },
        where: {
          id: idSample,
        },
      }),
    },
  );

  console.log("Update resp", {
    status: respUpdate.status,
    body: await respUpdate.text(),
  });

  console.error('----> 3. This update should not pass as per the maxlength : name String @length(3, 5)')

  const respUpdate2 = await fetch(
    "http://localhost:3001/api/model/SimpleItem/update",
    {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: {
          name: null
        },
        where: {
          id: idSample,
        },
      }),
    },
  );

  console.log("Update broken resp", {
    status: respUpdate2.status,
    body: await respUpdate2.text(),
  });

  console.error('----> 4. This update should not pass but the error is not descriptive "Invalid input at data"')
}

run();
